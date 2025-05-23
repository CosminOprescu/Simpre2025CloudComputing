import { useRouter } from 'next/router';  
import MusicForm from '../../../components/MusicForm';
import { createRecord } from '../../../utils/recordsFunctions';
import { defaultMusic } from '../../../utils/constants';

export default function Create() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await createRecord(data);
      router.push('/records');
    } catch (error) {
      console.error('Eroare la crearea înregistrării:', error);
    }
  };

  const handleCancel = () => {
    router.push('/records');
  };

  return (
    <div>
      <MusicForm 
        entry={defaultMusic}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
