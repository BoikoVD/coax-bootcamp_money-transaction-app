import React from 'react';
import { Button, Modal, Form, Input } from 'antd';

function EditPersonalDataForm() {

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={{ modifier: 'public' }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input type="textarea" />
      </Form.Item>
    </Form>
  )
}

export default EditPersonalDataForm;