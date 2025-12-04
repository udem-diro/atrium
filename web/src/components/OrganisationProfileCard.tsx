import Button from "./widgets/Button";

type OrganisationProfileCardProps = {
  name: string | null | undefined;
  link?: string;
  email: string;
};

function OrganisationProfileCard({
  name,
  link,
  email,
}: OrganisationProfileCardProps) {
  // Get initials from name
  const getInitials = (fullName?: string | null) => {
    if (!fullName) return "N/A";
    const words = fullName.split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className="w-full flex gap-5 md:gap-6 justify-center md:justify-start items-center border rounded-xl border-gray-400 p-4 md:p-6 lg:px-12 lg:py-8 shadow-md">
      {/* Initials Circle */}
      <div className="w-24 aspect-square rounded-full bg-primary text-white font-semibold flex justify-center items-center text-xl">
        {initials}
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="text-sm text-gray-800">
          <h3 className="font-semibold">{name ?? "Unnamed Organisation"}</h3>
          {link && (
            <h4 className="text-xs mb-0.5 text-gray-500 break-all">{link}</h4>
          )}
          <h4 className="font-semibold">{email}</h4>
        </div>

        {link && (
          <div className="flex gap-2 mt-2">
            <Button
              buttonText="Visit Link"
              size="responsive"
              variant="view"
              onClick={() => window.open(link, "_blank")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganisationProfileCard;
