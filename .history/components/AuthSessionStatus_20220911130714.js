const AuthSessionStatus = ({ status, className, ...props }) => (
    <>
        {status && (
            <div
                className={`${className} font-medium text-sm text-green-600`}
                {...props}>
                <span>{status}</span>
            </div>
        )}
    </>
)

export default AuthSessionStatus
