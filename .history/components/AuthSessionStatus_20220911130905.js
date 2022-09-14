const AuthSessionStatus = ({ status, className, ...props }) => (
    <>
        {status && (
            <div
                className={`${className} font-medium text-sm text-green-600`}
                {...props}>
                <CheckCircleIcon className="h-4 w-4 text-primary-700" /> <span>{status}</span>
            </div>
        )}
    </>
)

export default AuthSessionStatus
