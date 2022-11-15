import Link from 'next/link';
import { useRouter } from 'next/router';
import { Page, Alert, Gallery, FieldDef } from '../../types/types';
import IconButton from '../../components/common/IconButton';
import { IconEdit, IconView, IconDelete } from '../../components/img/icons';

// handleNavigateToEdit
type Props = {
  items: Page[] | Alert[] | Gallery[]; // Add other types
  tableFields: FieldDef[];
  slug: string;
  tableActions: string[];
  handleDelete: Function;
};
const PageDataTable: React.FC<Props> = ({
  items,
  slug,
  tableFields,
  tableActions,
  handleDelete
}) => {
  const router = useRouter();
  const handleNavigateToEdit = (id: string): void => {
    router.replace(`/${slug}/edit/${id}`);
  };

  return (
    <table className="mb-2">
      <thead>
        <tr>
          {tableFields.map((f) => (
            <th key={f.title}>{f.title}</th>
          ))}
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((i) => (
          <tr key={`${i.id}`}>
            <td>
              <label>Title:</label>
              <Link href={`pages/edit/${i.id}`}>{i.title}</Link>
            </td>
            <td>
              <label>Status:</label>
              {i.status.toUpperCase()}
            </td>
            <td className="right">
              {tableActions.includes('edit') && (
                <span className="mr-1">
                  <IconButton
                    onClick={() => handleNavigateToEdit(`${i.id}`)}
                    title="edit"
                    color="secondary"
                  >
                    <IconEdit />
                  </IconButton>
                </span>
              )}
              {tableActions.includes('view') && (
                <span className="mr-1">
                  <a
                    // @ts-ignore
                    href={`https://www.indytroop446.org/${i?.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton onClick={() => {}} title="view">
                      <IconView />
                    </IconButton>
                  </a>
                </span>
              )}
              {tableActions.includes('delete') && (
                <span>
                  <IconButton
                    onClick={() => handleDelete(i)}
                    title="delete"
                    color="primary"
                  >
                    <IconDelete />
                  </IconButton>
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PageDataTable;
