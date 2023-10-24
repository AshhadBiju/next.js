import Head from 'next/head';
import CreateAgent from '../components/createagentform[id]';

const CreateAgentPage = () => {
  return (
    <div>
      <Head>
        <title>Create Agent</title>
      </Head>
      <h1>Create Agent</h1>
      <CreateAgent />
    </div>
  );
};

export default CreateAgentPage;
