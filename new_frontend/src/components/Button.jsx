import PropTypes from 'prop-types';

const CustomButton = ({
	type = 'button',
	action,
	displayText,
	className = '',
	disabled = false,
}) => {
	return (
		<button
			className={`px-2 py-1 w-full rounded-md ${className}`}
			type={type}
			onClick={action}
			disabled={disabled}
		>
			{displayText}
		</button>
	);
};

CustomButton.propTypes = {
	type: PropTypes.string,
	action: PropTypes.func.isRequired,
	displayText: PropTypes.string.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
};

export default CustomButton;
