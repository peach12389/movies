import Modal from '../../containers/Modal';
import Image from 'next/image';
import { Shop_Timing } from '../../assets/images';

type TProps = {
  storeHours: Array<any>;
  isOpen: boolean;
  toggleModal: CallableFunction;
};

type TStoreHour = {
  isToday: boolean;
  isOpenNow: boolean;
  day: string;
  time: string;
};

const StoreHoursModal = ({ storeHours, isOpen, toggleModal }: TProps) => {
  return (
    <Modal isOpen={isOpen} requestClose={toggleModal}>
      <div className="bg-white rounded-lg py-3 px-5 flex items-center">
        <Image unoptimized src={Shop_Timing} height="100" width="100" alt="shop timings" />
        <span className="mx-6 mt-4 bg-gray-900 h-24 w-0.5 rounded-full" />
        <div>
          {storeHours.map((storeHour: TStoreHour, index: number) => {
            const { day, time, isToday } = storeHour;
            const textColor = isToday ? 'text-brand-green' : '';

            return (
              <p key={index} className="text-gray-400 text-sm">
                <span className={`${textColor} mr-2`}>{day}</span>
                {' - '}
                <span className="ml-2">{time}</span>
              </p>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default StoreHoursModal;
