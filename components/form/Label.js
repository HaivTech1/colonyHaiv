const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} block uppercase text-primary-600 text-xs font-bold mb-2`}
        {...props}
    >
        {children}
    </label>
);

export default Label;
