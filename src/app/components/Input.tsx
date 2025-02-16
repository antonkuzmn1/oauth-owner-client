import React, {useEffect, useState} from "react";

interface InputProps {
    label: string;
    type: React.HTMLInputTypeAttribute | undefined;
    placeholder?: string;
    value?: string | number;
    readOnly?: boolean;
    onChange?: (e: any) => void;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    }

    useEffect(() => {
    })

    return (
        <div className={'border border-gray-300 h-8 flex'}>
            <label className={'border-r border-gray-300 min-w-30 flex items-center justify-center'}>
                {props.label}
            </label>
            <input
                type={props.type === 'password' ? (passwordVisibility ? 'text' : 'password') : props.type}
                placeholder={props.placeholder}
                value={props.value}
                readOnly={props.readOnly}
                onChange={props.onChange}
                className={'p-2 w-full'}
            />
            {props.type === 'password' && (
                <button
                    className={'cursor-pointer hover:bg-gray-300 transition-colors duration-200 px-2'}
                    onClick={togglePasswordVisibility}
                    children={'Show'}
                />
            )}
        </div>
    )
}

export default Input;
