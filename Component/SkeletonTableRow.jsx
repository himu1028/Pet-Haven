import Skeleton from 'react-loading-skeleton';

const SkeletonTableRow = () => {
  return (
    <tr>
      {[...Array(9)].map((_, i) => (
        <td key={i} className="p-2 border">
          <Skeleton height={24} />
        </td>
      ))}
    </tr>
  );
};

export default SkeletonTableRow;
