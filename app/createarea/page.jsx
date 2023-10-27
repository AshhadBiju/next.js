import Head from 'next/head';
import CreateArea from '../components/createarea';

const CreateAreaForm = () => {
  return (
    <div>
      <Head>
        <title>Create Agent</title>
      </Head>
      <h1>Create Agent</h1>
      <CreateArea />
    </div>
  );
};

export default CreateAreaForm;