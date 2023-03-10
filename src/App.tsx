import "./App.css";
import Wizard, { Item, FormField } from "./wizard";
import { Form, Input, FormInstance } from "antd";

const inputTypeOptions: string[] = [
  "string",
  "number",
  "boolean",
  "method",
  "regexp",
  "integer",
  "float",
  "object",
  "enum",
  "date",
  "url",
  "hex",
  "email",
];

interface DynamicCompProps {
  antForm: FormInstance;
}

function prepareDynamicFormComponents(): React.FC<DynamicCompProps>[] {
  const forms = [
    {
      title: "Contact Details",
      fields: [
        { field: "First Name", type: "text", required: true },
        { field: "Email", type: "email", required: true },
      ],
    },
    {
      title: "Agreement",
      fields: [{ field: "Parent Compnay", type: "text", required: false }],
    },
    {
      title: "Feedback",
      fields: [{ field: "Feedback", type: "text", required: false }],
    },
  ];

  function prepareDynamicComponent(item: Item): any {
    /**
     * Prepares a dynamic component to render form fields
     *
     * with basic form validations based on field's type
     */
    return ({ antForm }: DynamicCompProps) => {
      return (
        <>
          <Form title={item.title} form={antForm}>
            <h2>{item.title}</h2>
            {item.fields?.map((field: FormField, fieldIndex: number) => {
              const rule: any = {
                ...(field.required && { required: field.required }),
                ...(inputTypeOptions.includes(field.type) && {
                  type: field.type,
                }),
                message: `Please enter valid value for ${field.field}`,
              };
              return (
                <Form.Item
                  key={fieldIndex}
                  name={field.field}
                  label={field.field}
                  rules={[rule]}
                >
                  <Input type={field.type} />
                </Form.Item>
              );
            })}
          </Form>
        </>
      );
    };
  }
  return forms.map((form: any, index: number) => {
    return prepareDynamicComponent(form);
  });
}

const PackagesList: React.FC<any> = () => {
  return (
    <div>
      <h2>--Packages--</h2>
    </div>
  );
};

const Summary: React.FC<any> = () => {
  return (
    <div>
      <h2>--Summary--</h2>
    </div>
  );
};

function App() {
  const [form] = Form.useForm();
  const dynamicFormComponents = prepareDynamicFormComponents();
  async function handleNext() {
    try {
      const values = await form.validateFields();
      console.log(values);
      return true;
    } catch {
      console.log("Please check form field values");
      return false;
    }
  }
  const formSections = dynamicFormComponents.map(
    (Component: React.FC<DynamicCompProps>) => {
      return { title: "Event Forms", content: <Component antForm={form} /> };
    }
  );
  const sections = [
    { title: "Packages", content: <PackagesList /> },
    ...formSections,
    { title: "Summary", content: <Summary /> },
  ];
  return (
    <div className="App">
      <Wizard sections={sections} onNext={handleNext} />
    </div>
  );
}

export default App;
