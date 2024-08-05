import { Store } from "antd/es/form/interface";
import { useEffect } from "react";
import { FormInstance } from "antd/lib";
import { Form as FormAnt } from "antd";
import { FormItemProps } from "antd/es/form";

import "./index.less";
import Button from "./Button";

export type ItemForm = FormItemProps & {
  field: any;
};

type FormProps = {
  name: string;
  form: FormInstance<any>;
  values?: object;
  items: ItemForm[];
  getButtonSubmit: boolean;
  onFinish?: ((values: Store) => void) | undefined;
};

const Form = ({ name, form, values, items, getButtonSubmit, onFinish }: FormProps) => {
  useEffect(() => {
    if (values) {
      form.setFieldsValue(values);
    }
  }, [values]);

  return (
    <FormAnt form={form} name={name} onFinish={onFinish} layout="vertical">
      {items?.map((item, idx) => (
        <FormAnt.Item
          key={idx}
          name={`${item.name}`}
          label={item.label}
          rules={item.rules}
          style={item?.style}
          colon={false}
        >
          {item?.field}
        </FormAnt.Item>
      ))}
      {getButtonSubmit && <Button title="Submit" type="submit" htmlType="submit" />}
    </FormAnt>
  );
};

export default Form;
