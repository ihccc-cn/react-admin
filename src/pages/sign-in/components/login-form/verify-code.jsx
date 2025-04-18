import React from 'react';
import { Form, Input, Button } from 'antd';
import { useInterval } from 'ahooks';

function VerifyCode({ timecount, onSend, ...restProps }) {
  const [countdown, setCountDown] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const email = Form.useWatch('email');

  useInterval(
    () => {
      setCountDown((cd) => cd - 1);
    },
    countdown > 0 ? 1000 : undefined,
  );

  const handleSend = React.useCallback(async () => {
    setLoading(true);
    const issend = onSend && (await onSend({ email }));
    setLoading(false);
    if (issend) setCountDown(timecount > 10 ? timecount : 120);
  }, [email, onSend]);

  return (
    <Input
      {...restProps}
      addonAfter={
        <Button
          loading={loading}
          type="link"
          size="small"
          disabled={countdown > 0}
          onClick={handleSend}
          style={{ height: 20, lineHeight: '20px' }}
        >
          {countdown === 0 ? '发送验证码' : `${countdown} 秒后重试`}
        </Button>
      }
    />
  );
}

export default VerifyCode;
