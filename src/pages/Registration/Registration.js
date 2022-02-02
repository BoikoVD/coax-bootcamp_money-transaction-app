import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import classes from './Registration.module.css';

function Registration() {

	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div className={classes.wrapper}>
			<Form
				size="large"
				name="login"
				wrapperCol={{ span: 16 }}
				labelCol={{ span: 8 }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: 'Please input your email!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="First name"
					name="firstName"
					rules={[
						{
							required: true,
							message: 'Please input your first name!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Last name"
					name="lastName"
					rules={[
						{
							required: true,
							message: 'Please input your last name!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 8,
					}}

				>
					<Button type="primary" htmlType="submit" >
						Register
					</Button>
				</Form.Item>
				<Col span={8} offset={8}>
					<Link to="/login" className={classes.link}>Back</Link>
				</Col>
			</Form>
		</div>
	)
}

export default Registration;