import type { Notification } from "../models/Notification";
import type { Offer } from "../models/Offer";
import type { User } from "../models/User";
import { supabase } from "../API/supabaseClient";

export type AppState = {
  // Auth & User
  auth: {
    connectedUser: User | null;
    isAuthenticated: boolean;
    token: string | null;
  };

  // Offers and submissions
  offers: Offer[];
  selectedOfferId: string | null;
  selectedSubmissionId: string | null;

  // Notifications
  notifications: Notification[];

  // Selected tab on main view
  selectedTab: string;

  // Global Loading/Error
  global: {
    language: "fr" | "en";
    theme: "light" | "dark";
    isLoading: boolean;
    error: Error | null;
  };
};

type Listener = (state: AppState) => void;
type Middleware = (action: string, state: AppState, prev: AppState) => void;

const INITIAL_STATE: AppState = {
  auth: {
    connectedUser: null,
    isAuthenticated: false,
    token: null,
  },
  global: {
    isLoading: false,
    error: null,
    language: "fr",
    theme: "light",
  },

  offers: [],
  selectedOfferId: null,
  selectedSubmissionId: null,
  notifications: [],
  selectedTab: "Opportunities", // default opportunities tab
};

export class Store {
  private state: AppState = { ...INITIAL_STATE };
  private listeners: Set<Listener> = new Set();
  private middlewares: Middleware[] = [];

  /**
   * Returns a shallow copy of the current state
   */
  public getState(): AppState {
    return { ...this.state };
  }

  /**
   * Updates state with partial updates
   */
  public setState(
    patch: Partial<AppState> | ((s: AppState) => Partial<AppState>),
    actionName?: string
  ): void {
    const prevState = this.state;
    const newState: Partial<AppState> =
      typeof patch === "function" ? patch(this.state) : patch;

    // Merge state
    this.state = { ...this.state, ...newState };

    // Run middlewares
    this.middlewares.forEach((mw) =>
      mw(actionName || "setState", this.state, prevState)
    );

    this.notify();
  }

  /**
   * Resets state to initial values
   */
  public reset(): void {
    this.setState({ ...INITIAL_STATE }, "reset");
  }

  /**
   * Subscribes to state changes
   */
  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public addMiddleware(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  private notify(): void {
    const snapshot = this.getState();
    this.listeners.forEach((listener) => listener(snapshot));
  }

  // ==================== AUTH ====================

  public async login(email : string, password : string): Promise<void> {

    // 1. Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
      });

    if (error) {
      this.setState(
        {
          global: { ...this.state.global, error },
        },
        "login"
      );
      return;
    }

    const supabaseUser = data.user;
    const token = data.session?.access_token || null;

    // Convert Supabase user to your User type or fetch the full user profile
    const user: User = {
      id: supabaseUser?.id,
      email: supabaseUser?.email || "",
      firstName: supabaseUser?.user_metadata?.firstName || "",
      lastName: supabaseUser?.user_metadata?.lastName || "",
      role: supabaseUser?.user_metadata?.role || "student",
      createdAt: supabaseUser?.created_at || "",
    };

    this.setState(
      {
        auth: {
          connectedUser: user,
          isAuthenticated: true,
          token,
        },
      },
      "login"
    );

  }

  // ==================== SETTINGS ====================

  public setLanguage(language: "fr" | "en"): void {
    this.setState(
      {
        global: { ...this.state.global, language },
      },
      "setLanguage"
    );
  }

  // ===================== Main View Tabs ========================
  public setSelectedTab(tab: string) {
    this.setState({ selectedTab: tab }, "setSelectedTab");
  }

  // ==================== NOTIFICATIONS ====================

  public addNotification(
    message: string,
    type: Notification["type"] = "info",
    actionUrl?: string
  ): void {
    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random()}`,
      message,
      type,
      timestamp: Date.now(),
      read: false,
      actionUrl,
    };

    this.setState(
      (s) => ({
        notifications: [...s.notifications, notification],
      }),
      "addNotification"
    );

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, 5000);
  }

  public removeNotification(id: string): void {
    this.setState(
      (s) => ({
        notifications: s.notifications.filter((n) => n.id !== id),
      }),
      "removeNotification"
    );
  }

  public markNotificationAsRead(id: string): void {
    this.setState(
      {
        notifications: this.state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      },
      "markNotificationAsRead"
    );
  }

  public clearNotifications(): void {
    this.setState({ notifications: [] }, "clearNotifications");
  }
}

let storeInstance: Store | null = null;

export function getStore(): Store {
  if (!storeInstance) {
    storeInstance = new Store();
  }
  return storeInstance;
}

export function resetStore(): void {
  storeInstance = null;
}
