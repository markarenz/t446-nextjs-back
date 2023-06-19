import Link from 'next/link';
import { useRouter } from 'next/router';
import { Alert, Gallery, Setting, Page } from '@prisma/client';
import { FieldDef } from '../../types/types';
import IconButton from '../../components/common/IconButton';
import { IconEdit, IconView, IconDelete } from '../../components/img/icons';

// handleNavigateToEdit
type Props = {
  items: Alert[] | Gallery[] | Setting[] | Page[];
  tableFields: FieldDef[];
  slug: string;
  tableActions: string[];
  handleDelete: Function;
  viewPrefix: string;
};
const PageDataTable: React.FC<Props> = ({
  items,
  slug,
  tableFields,
  tableActions,
  handleDelete,
  viewPrefix
}) => {
  const router = useRouter();
  const handleNavigateToEdit = (id: string): void => {
    router.replace(`/${slug}/edit/${id}`);
  };
  return (
    <table className="mb-2" data-testid="page-data-table">
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
            {tableFields.some((f) => f.title === 'Title') && (
              <td>
                <label>Title:</label>
                <Link href={`edit/${i.id}`}>{i.title}</Link>
              </td>
            )}
            {tableFields.some((f) => f.title === 'Modified') && (
              <td>
                <label>Modified:</label>
                <span>{new Date(i.dateModified).toLocaleString()}</span>
              </td>
            )}

            {tableFields.some((f) => f.title === 'Status') && (
              <td>
                <label>Status:</label>
                {/* @ts-ignore */}
                <span>{i.status.toUpperCase()}</span>
              </td>
            )}

            <td className="right">
              {tableActions.includes('edit') && (
                <span className="mr-1">
                  <IconButton
                    testId={`page-table-item-${i.id}`}
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
                    href={`https://www.indytroop446.org/${viewPrefix}${i?.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton
                      testId={`page-table-view-item-${i.id}`}
                      onClick={() => {}}
                      title="view"
                    >
                      <IconView />
                    </IconButton>
                  </a>
                </span>
              )}
              {tableActions.includes('delete') && (
                <span>
                  <IconButton
                    testId={`page-table-delete-item-${i.id}`}
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
