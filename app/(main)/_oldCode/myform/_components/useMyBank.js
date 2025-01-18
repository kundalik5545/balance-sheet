import { addBank, getBank, getBankAccounts } from "@/actions/oldCode/myBank";
import useFetch from "@/hooks/use-Fetch";

const useMyBank = () => {
  // Create Bank Account function
  const {
    apiFun: createBankFn,
    apiRes: createBankRes,
    loading: createBankLoading,
    error: createBankError,
  } = useFetch(addBank);

  // Fetch Bank Account function
  // const {
  //   apiFun: getBankFn,
  //   apiRes: getBankRes,
  //   error: getBankError,
  //   loading: getBankLoading,
  // } = useFetch(getBank);

  // Fetch Bank Account function
  const {
    apiFun: getBankFn,
    apiRes: getBankRes,
    error: getBankError,
    loading: getBankLoading,
  } = useFetch(getBankAccounts);

  return {
    //   Create bank
    createBankFn,
    createBankRes,
    createBankLoading,
    createBankError,
    // Fetch Bank
    getBankFn,
    getBankRes,
    getBankError,
    getBankLoading,
  };
};

export default useMyBank;
