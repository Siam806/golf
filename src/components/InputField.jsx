import React from "react";

export default function InputField({ title, placeholder, type, required, defaultValue, name, onChange, optionsList }) {
	return (
		<section>
			{title && <label className="block font-bold text-xs text-center">{title}</label>}
			{optionsList ? (
				<select required={required ?? false} defaultValue={defaultValue ?? ""} name={name} onChange={onChange} className="w-48 text-xs p-3 border rounded bg-gray-100 text-black">
					{optionsList.map((option, index) => (
						<option key={index} value={index == 0 ? "" : option} disabled={index === 0}>
							{option}
						</option>
					))}
				</select>
			) : (
				<input type={type ?? "text"} required={required ?? false} defaultValue={defaultValue} name={name} onChange={onChange} placeholder={placeholder} className="w-48 text-xs p-3 border rounded bg-gray-100 text-black" />
			)}
		</section>
	);
}
