import SidebarNotes from '@/components/SidebarNotes/SidebarNotes';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const NotesSidebar = async () => {
  return (
    <div>
      <SidebarNotes tags={tags} />
    </div>
  );
};

export default NotesSidebar;
