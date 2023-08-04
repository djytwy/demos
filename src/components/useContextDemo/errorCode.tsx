import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
  PropsWithChildren,
} from 'react';

interface dataProps {
  account: string;
  setAccount: Dispatch<SetStateAction<string>>;
}

const Ctx = createContext<dataProps>({
  account: '',
  setAccount: () => {},
});

const Provider = ({ children }: PropsWithChildren) => {
  const [account, setAccount] = useState('');

  return (
    <Ctx.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

const useSignInContext = () => useContext(Ctx);

export { Provider as SignInProvider, useSignInContext };

function ErrorCode() {
  // 错误的使用方式，因为不能在Provider外部使用useSignInContext函数，会导致调用失效
  const { account, setAccount } = useSignInContext();

  return (
    <>
      <Provider>
        <div>
          <button
            onClick={() => {
              setAccount('recover');
              console.log(setAccount);

              console.log('1232');
            }}
          >
            {' '}
            click
          </button>
        </div>
      </Provider>
    </>
  );
}
  
function App() {
  const { account, setAccount } = useSignInContext();
  return (
    <div>
      {account}
      <button
        onClick={() => {
          setAccount('recover');
          console.log(setAccount);

          console.log('1232');
        }}
      >
        {' '}
        click
      </button>
    </div>
  )
}

// 正确的使用方式：
export default function Fixed() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}