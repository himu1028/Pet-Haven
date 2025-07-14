import Skeleton from 'react-loading-skeleton';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <Skeleton height={200} className="mb-4 rounded-xl" />
      <Skeleton height={24} width={`80%`} className="mb-2" />
      <Skeleton height={20} width={`60%`} />
    </div>
  );
};

export default SkeletonCard;
