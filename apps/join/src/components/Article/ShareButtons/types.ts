export interface Message {
  title: string;
  text?: string;
}

export interface ButtonProps {
  title: string;
  message?: Message;
  className?: string;
  onClick?: () => void;
}
