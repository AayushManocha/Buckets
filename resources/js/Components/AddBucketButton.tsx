import { useEffect, useState } from "react";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import Spacer from "./Spacer";
import { useForm } from "@inertiajs/react";

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

export default function AddBucketButton() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <PrimaryButton onClick={() => setShowModal(true)}>Add Bucket</PrimaryButton>
      <AddBucketModal show={showModal} onClose={() => setShowModal(false)} />
    </>

  );
}