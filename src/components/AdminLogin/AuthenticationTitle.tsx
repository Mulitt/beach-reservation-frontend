import { useForm } from '@mantine/form'
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Container,
    Group,
    Button,
} from '@mantine/core'
import { useState } from 'react'
import LoginAlert from './LoginAlert'
import { useNavigate } from 'react-router-dom'

interface TPropFunction {
    setAuth: Function
}

export function AuthenticationTitle({ setAuth }: TPropFunction) {
    const [error, setError] = useState(false)
    const form = useForm({
        initialValues: { email: '', password: '' },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
            password: (value) =>
                value.length <= 0 ? 'Please input password' : null,
        },
    })

    const navigate = useNavigate()

    const validateCredentials = async () => {
        const response = await fetch(
            // 'http://localhost:5000/api/admin/authenticate',
            'https://beach-reservation.onrender.com/api/admin/authenticate',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email: form.getInputProps('email').value,
                    password: form.getInputProps('password').value,
                }),
            }
        )
        const { result } = await response.json()
        if (!result) return setError(true)
        setAuth(result)
        navigate('/admin/dashboard')
    }

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                })}
            >
                Welcome Admin!
            </Title>

            {error ? <LoginAlert /> : null}

            <Paper withBorder shadow="md" p={30} mt={10} radius="md">
                <form onSubmit={form.onSubmit(validateCredentials)}>
                    <TextInput
                        label="Email"
                        placeholder="you@mantine.dev"
                        onInput={() => setError(false)}
                        {...form.getInputProps('email')}
                        required
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        {...form.getInputProps('password')}
                        required
                        mt="md"
                    />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
                        <Anchor<'a'>
                            onClick={(event) => event.preventDefault()}
                            href="#"
                            size="sm"
                        >
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button type="submit" fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}