import React from 'react';
import { useForm } from "react-hook-form";
import cn from 'classnames';

function ChatForm({ onSend }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange'});

  const onSubmit = data => {
    onSend(data);
  };

  return (
    <form className='chat__form' name='chat-form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <input
        type="text"
        {...register("msg", { required: true })}
        className='chat__input'
        placeholder="Type a message..."
        autoComplete="off"
      />

      <button
        type="submit"
        className={cn('chat__btn chat__btn_pos_absolute', { "chat__btn_inactive": errors.msg })}
        disabled={errors.msg}
      >
        Send
      </button>
    </form>
  );
}

export default ChatForm;
