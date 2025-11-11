import Button from "./widgets/Button";

function AdminProfileCard() {
  return (
    <div className="w-full flex gap-5 md:gap-6 lg:gap-12 xl:gap-16 2xl:gap-24 justify-center items-center md:justify-start border rounded-xl border-gray-400 p-4 md:p-6 lg:px-24 lg:py-8 shadow-md">
      <div className="w-18 lg:w-28 aspect-square rounded-full bg-primary text-white font-semibold flex justify-center items-center">
        S
      </div>
      <div className="">
        <div className="text-sm text-gray-800">
          <h3 className="font-semibold">Susanna Hernandez</h3>
          <h4 className="text-xs mb-0.5 text-gray-500">
            Graduate internship manager - DIRO
          </h4>
        </div>
        <div className="flex flex-col md:flex-row gap-2 wrap-anywhere">
          <h4 className="font-semibold text-sm">s.hernandez@example.com</h4>
          <h4 className="text-sm">Pav. AA, room 123</h4>
        </div>
        <div className="flex gap-2 mt-2">
          <Button buttonText="Contact" size="responsive" variant="view" />
        </div>
      </div>
    </div>
  );
}

export default AdminProfileCard;
