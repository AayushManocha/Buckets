import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputLabel from "./InputLabel";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import Spacer from "./Spacer";
import TextInput from "./TextInput";

type AddBucketModalProps = {
  show: boolean;
  onClose: () => void;
};

function AddBucketModal({ show, onClose }: AddBucketModalProps) {

  const { data, setData, post, errors, wasSuccessful, reset } = useForm({
    name: '',
    budget: ''
  })

  useEffect(() => {
    if (wasSuccessful) {
      onClose()
      reset()
    }
  }, [wasSuccessful])

  const handleSubmit = () => {
    post(route('bucket.create'));
  }

  return (
    <Modal maxWidth="lg" show={show} onClose={onClose} closeable>
      <div className="flex flex-col p-12 justify-between">
        <InputLabel>Bucket Name</InputLabel>
        <TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} />

        <Spacer size={6} />

        <InputLabel>Budget</InputLabel>
        <TextInput value={data.budget} onChange={(e) => setData('budget', e.target.value)} />

        <Spacer size={6} />

        <PrimaryButton
          className="self-center"
          onClick={handleSubmit}
        >
          Add Bucket
        </PrimaryButton>
      </div>
    </Modal>
  )
}

type AddBucketProps = {
  className?: string
}

export default function AddBucketButton({ className }: AddBucketProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={`${className}`}>
      <PrimaryButton onClick={() => setShowModal(true)}>Add Bucket</PrimaryButton>
      <AddBucketModal show={showModal} onClose={() => setShowModal(false)} />
    </div>

  );
}