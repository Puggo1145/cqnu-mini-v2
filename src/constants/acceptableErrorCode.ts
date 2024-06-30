// 部分错误码表示我们期望的行为，比如 login 接口的用户不存在错误码，这些错误码不应该被视为错误
export const acceptableErrorCode = [
    "A000116" // 用户不存在
]