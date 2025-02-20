import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Container,
    Typography,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    styled,
} from "@mui/material";

const generatePassword = (
    length,
    includeNumbers,
    includeSymbols,
    letterCase
) => {
    let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    let characters = "";

    // Визначаємо, які літери використовувати
    if (letterCase === "lowercase") {
        characters += lowercaseLetters;
    } else if (letterCase === "uppercase") {
        characters += uppercaseLetters;
    } else {
        characters += lowercaseLetters + uppercaseLetters;
    }

    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return password;
};

export default function PasswordGenerator() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            length: 12,
            includeNumbers: true,
            includeSymbols: false,
            letterCase: "random", // Випадковий вибір великих/малих літер
        },
    });

    const [password, setPassword] = useState("");

    const onSubmit = (data) => {
        setPassword(
            generatePassword(
                Number(data.length),
                data.includeNumbers,
                data.includeSymbols,
                data.letterCase
            )
        );
    };

    return (
        <Wrapper>
            <Typography variant="h4" gutterBottom>
                Генератор паролів
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="length"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Довжина пароля"
                            type="number"
                            inputProps={{ min: 4, max: 32 }}
                            fullWidth
                        />
                    )}
                />
                <Controller
                    name="includeNumbers"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Checkbox {...field} checked={field.value} />
                            }
                            label="Включити цифри"
                        />
                    )}
                />
                <Controller
                    name="includeSymbols"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Checkbox {...field} checked={field.value} />
                            }
                            label="Включити символи"
                        />
                    )}
                />

                <FormControl component="fieldset">
                    <FormLabel component="legend">Регістр літер</FormLabel>
                    <Controller
                        name="letterCase"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup {...field}>
                                <FormControlLabel
                                    value="lowercase"
                                    control={<Radio />}
                                    label="Тільки малі"
                                />
                                <FormControlLabel
                                    value="uppercase"
                                    control={<Radio />}
                                    label="Тільки великі"
                                />
                                <FormControlLabel
                                    value="random"
                                    control={<Radio />}
                                    label="Випадкові"
                                />
                            </RadioGroup>
                        )}
                    />
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Згенерувати
                </Button>
            </form>
            {password && (
                <Result variant="h6">
                    Ваш пароль: <b>{password}</b>
                </Result>
            )}
        </Wrapper>
    );
}

let Wrapper = styled(Container)`
    margin-top: 2rem;
    text-align: center;
`;

let Result = styled(Typography)`
    margin-top: 2rem;
    word-break: break-all;
`;
