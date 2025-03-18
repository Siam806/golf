import React, { useState } from "react";

export default function InputField({ title, placeholder, type, required, defaultValue, name, onChange, optionsList }) {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisible = () => {
		setIsVisible(!isVisible);
	};

	return (
		<section>
			{title && <label className="block font-bold text-xs text-center">{title}</label>}
			{optionsList ? (
				<select required={required ?? false} defaultValue={defaultValue ?? ""} name={name} onChange={onChange} className="p-2 text-white bg-gray-700 border rounded min-w-58">
					{optionsList.map((option, index) => (
						<option key={index} value={index == 0 ? "" : option} disabled={index === 0}>
							{option}
						</option>
					))}
				</select>
			) : type === "password" ? (
				<div className="flex flex-row justify-center gap-2">
					<input type={isVisible ? "text" : "password"} required={required ?? false} defaultValue={defaultValue} name={name} onChange={onChange} placeholder={placeholder} className="p-2 text-white bg-gray-700 border rounded min-w-58" />
					<button type="button" onClick={toggleVisible} className="border-2 rounded-xl flex justify-center items-center p-2 hover:bg-green-500 hover:text-white active:bg-green-600 active:text-white">
						<span className="material-icons">{isVisible ? "visibility" : "visibility_off"}</span>
					</button>
				</div>
			) : (
				<input type={type ?? "text"} required={required ?? false} defaultValue={defaultValue} name={name} onChange={onChange} placeholder={placeholder} className="p-2 text-white bg-gray-700 border rounded min-w-58" />
			)}
		</section>
	);
}
