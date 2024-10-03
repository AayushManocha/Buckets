import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import CustomDatePicker from "./Datepicker";
import InputLabel from "./InputLabel";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import Spacer from "./Spacer";
import TextInput from "./TextInput";


type AddTransactionModalProps = {
  show: boolean;
  onClose: () => void;
};

function AddTransactionModal({ show, onClose }: AddTransactionModalProps) {

  const buckets = usePage().props.buckets;
  const firstBucketId = buckets?.length > 0 ? buckets[0].id : null;
  const bucket = usePage().props.bucket;

  const { data, setData, post, errors, wasSuccessful } = useForm({
    bucket_id: bucket?.id || firstBucketId,
    amount: '',
    description: '',
    date: new Date(),

  })

  useEffect(() => { onClose() }, [wasSuccessful])

  const handleSubmit = () => {
    post(route('transaction.create'));
  }

  return (
    <Modal maxWidth="lg" show={show} onClose={onClose} closeable>
      <div className="flex flex-col p-12 justify-between">

        <InputLabel>Bucket</InputLabel>
        <select
          id="bucket-select"
          value={data.bucket_id}
          onChange={(e) => setData('bucket_id', e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {buckets.map((bucket) => (
            <option key={bucket.id} value={bucket.id}>
              {bucket.name}
            </option>
          ))}
        </select>
        <p className="text-red-500">{errors.bucket_id}</p>


        <Spacer size={6} />

        <InputLabel>Amount</InputLabel>
        <TextInput value={data.amount} onChange={(e) => setData('amount', e.target.value)} />
        <p className="text-red-500">{errors.amount}</p>

        <Spacer size={6} />

        <InputLabel>Description</InputLabel>
        <TextInput value={data.description} onChange={(e) => setData('description', e.target.value)} />
        <p className="text-red-500">{errors.description}</p>

        <Spacer size={6} />

        <InputLabel>Date</InputLabel>
        <CustomDatePicker selectedDate={data.date} setSelectedDate={(date) => setData('date', date)} />
        <p className="text-red-500">{errors.date}</p>

        <Spacer size={6} />

        <PrimaryButton
          className="self-center"
          onClick={handleSubmit}
        >
          Add Transaction
        </PrimaryButton>
      </div>
    </Modal>
  )
}

export default function AddTransactionButton() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setShowModal(true)}>Add Transaction</PrimaryButton>
      <AddTransactionModal show={showModal} onClose={() => setShowModal(false)} />
    </>

  );
}
