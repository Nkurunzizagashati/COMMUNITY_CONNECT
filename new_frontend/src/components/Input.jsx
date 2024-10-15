import PropTypes from 'prop-types';

const CustomInput = ({
	type = 'text',
	value,
	placeholder,
	onChange,
	className = '',
	disabled = false,
	name,
}) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			className={`px-2 py-1 rounded-md w-full outline-none ${className}`}
			disabled={disabled}
		/>
	);
};

CustomInput.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	name: PropTypes.string,
};

export default CustomInput;
