import Head from 'next/head';
import CreateCustomerForm from '../components/createCustomer';

const CreateCustomer = () => {
  return (
    <div>
      <Head>
        <title>Create Customer</title>
      </Head>
      <h1>Create Customer</h1>
      <CreateCustomerForm />
    </div>
  );
};

export default CreateCustomer;