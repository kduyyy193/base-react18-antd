import { Form as FormAnt, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import Form, { ItemForm } from "components/Form";
import { useStateContext } from "contexts/ContextProvider";
import UserService from "services/user";

const Login = () => {
  const [form] = FormAnt.useForm();
  const { setToken, setUser } = useStateContext();

  const onFinish = async (values: Store) => {
    const { username, password } = values;
    if (username && password) {
      const data = await UserService.login({ username, password });
      setToken(data?.token);
      setUser(data);
    }
  };

  const formItems: ItemForm[] = [
    {
      name: "username",
      label: "Username",
      rules: [{ required: true, message: "Please input your username!" }],
      field: <Input />,
    },
    {
      name: "password",
      label: "Password",
      rules: [{ required: true, message: "Please input your password!" }],
      field: <Input.Password />,
    },
  ];

  return (
    <div className="w-[600px] mx-auto">
      <Form
        form={form}
        items={formItems}
        name="login"
        i18nIsDynamicList
        onFinish={onFinish}
        getButtonSubmit={true}
      />
    </div>
  );
};
export default Login;
