import { useNavigate } from "react-router-dom";

import Button from "./widgets/Button";
import Tag from "./widgets/Tag";

function OppotunityCard() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3 lg:gap-4 justify-start p-4 md:p-5 2xl:p-10 border rounded-lg shadow-md hover:shadow-black/20 transition-shadow">
      <h4 className="text-[#AA0000]">deadline in 3 days</h4>
      <div className="flex gap-2">
        <Tag tagText="TA" />
        <h2 className="font-semibold">Biology TA</h2>
      </div>
      <p className="text-[#838383] text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor
        nisi lectus, a lacinia nibh volutpat a. Donec pulvinar eros et lectus
        finibus egestas.
      </p>

      <div className="flex gap-6 text-sm text-[#848484] font-bold self-center">
        <div>
          <ul>
            <li>15sep -15dec</li>
            <li>$18-20/h</li>
            <li>2 persons</li>
          </ul>
        </div>
        <div className="w-px h-12 bg-gray-300 self-center"></div>
        <div>
          <ul>
            <li>20-25h/week</li>
            <li>Pav.Roger G 2442</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">Professeur</h2>
        <div className="flex items-center gap-6">
          <div className="flex justify-center items-center w-16 h-16 rounded-full bg-primary text-white font-bold">
            J
          </div>
          <div className="text-sm">
            <h4 className="font-bold">Dr. John Smith</h4>
            <h4>Biology</h4>
            <h4 className="text-[#005DAA] font-semibold">j.smith@udem.ca</h4>
          </div>
        </div>
      </div>

      <Button
        buttonText="view details"
        variant="view"
        onClick={() => navigate("/opportunity")}
      />
    </div>
  );
}

export default OppotunityCard;
