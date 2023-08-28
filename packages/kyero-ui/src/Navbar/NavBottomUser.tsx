export interface NavBottomUserProps {
  title: string;
  imgSrc: string;
  subtitle?: string;
}

export const NavBottomUser = (props: NavBottomUserProps) => (
  <div className="flex items-center gap-3 p-4 pt-8 text-white" data-testid="nav-bottom-user">
    <img src={props.imgSrc} alt={props.title} className="h-12 w-12 rounded-md bg-white" />
    <div className="text-p-3 overflow-hidden">
      <p className="font-bold">{props.title}</p>
      {props.subtitle ? <span className="block w-full truncate">{props.subtitle}</span> : null}
    </div>
  </div>
);

NavBottomUser.displayName = 'NavBottomUser';
