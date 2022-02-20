// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { Form } from 'antd';
// import SendMoneyForm from './SendMoneyForm';

// const [form] = Form.useForm();

// const correctFormatArr = ["10", "20.2", "100.25", "5.", ".05"];
// const wrongFromatArr = ["text", ",", "-"];

// describe("SendMoneyForm component", () => {
//   test("Enter correct format data", () => {
//     render(<SendMoneyForm form={form} />);
//     userEvent.type(screen.findByRole("textbox"), "10");
//     expect(screen.findByRole("textbox")).toContain("10");
//   })
// });