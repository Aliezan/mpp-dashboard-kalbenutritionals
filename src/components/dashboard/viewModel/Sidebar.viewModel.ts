import useStore from '@/store/store';

const SidebarViewModel = () => {
  const { isExpand, setIsExpand } = useStore();

  return {
    isExpand,
    setIsExpand,
  };
};

export default SidebarViewModel;
