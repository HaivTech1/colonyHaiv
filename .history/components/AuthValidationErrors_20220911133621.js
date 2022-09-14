import { IconName } from "react-icons/fa";

const AuthValidationErrors = ({ errors = [], ...props }) => (
    <>
        {errors.length > 0 && (
            <div {...props}>
                <div className="font-medium text-red-600">
                    Whoops! Something went wrong.
                </div>

                <ul className="mt-3 list-none list-inside text-sm text-red-600">
                    {errors.map((error, index) => (
                        <li key={index}>
                            <FaTimes className="h-4 w-4 text-red-600 mr-4" /> 
                            <span>{error}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </>
)

export default AuthValidationErrors
