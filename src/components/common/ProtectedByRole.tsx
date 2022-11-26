import { useSession } from 'next-auth/react';
import { getIsAdmin } from '../../helpers';

type Props = {
  children: JSX.Element;
};
const ProtectedByRole: React.FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const isAuthorized = session ? getIsAdmin(session) : false;
  return isAuthorized ? (
    children
  ) : (
    <div>
      <h2>You are not authorized for this page.</h2>
    </div>
  );
};

export default ProtectedByRole;
