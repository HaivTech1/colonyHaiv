import React from 'react'

const TwoFactorInfo = () => {
  return (
    <div className="flex flex-wrap justify-around space-x-4 items-center">
            <div className="flex-3">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Password
                    </h3>
                </div>
            </div>

            <div className="flex-1 max-w-5xl">
                <div className="mb-4">
                    <Label> Current Password </Label>
                    <TextInput
                        id="currentPassword"
                        name="current_password"
                        type="password"
                        value={fields.current_password}
                        onChange={updateFields}
                    />
                </div>
                <div className="mb-4">
                    <Label>New Password  </Label>
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={fields.password}
                        onChange={updateFields}
                    />
                </div>

                <div className="mb-4">
                    <Label> Confirm New Password </Label>
                    <TextInput
                        id="passwordConfirmation"
                        name="password_confirmation"
                        type="password"
                        value={fields.password_confirmation}
                        onChange={updateFields}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={updatePassword}
                        className="button"
                        type="submit"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light">
                        Save
                    </button>
                </div>
            </div>
            
        </div>
  )
}

export default TwoFactorInfo
