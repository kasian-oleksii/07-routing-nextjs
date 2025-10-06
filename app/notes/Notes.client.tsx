// 'use client';

// import { useState } from 'react';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useDebouncedCallback } from 'use-debounce';
// import css from './NotesPage.module.css';
// import { fetchNotes } from '../../lib/api';
// import NoteList from '../../components/NoteList/NoteList';
// import SearchBox from '../../components/SearchBox/SearchBox';
// import Modal from '../../components/Modal/Modal';
// import NoteForm from '../../components/NoteForm/NoteForm';
// import Pagination from '../../components/Pagination/Pagination';
// import { FetchNoteList } from '@/types/note';

// type NotesClientProps = {
//   initialData: FetchNoteList;
// };

// export default function NotesClient({ initialData }: NotesClientProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [inputValue, setInputValue] = useState('');
//   const [debouncedValue, setDebouncedValue] = useState('');

//   const debouncedSearch = useDebouncedCallback((value: string) => {
//     setDebouncedValue(value);
//     setCurrentPage(1);
//   }, 300);

//   const handleSearchChange = (value: string) => {
//     setInputValue(value);
//     debouncedSearch(value);
//   };

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['notes', currentPage, debouncedValue],
//     queryFn: () => fetchNotes(currentPage, debouncedValue),
//     placeholderData: keepPreviousData,
//     initialData,
//   });

//   const totalPages = data?.totalPages ?? 0;

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox value={inputValue} onSearch={handleSearchChange} />

//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           Create note +
//         </button>
//       </header>

//       {isLoading && <p className={css.loading}>loading notes...</p>}
//       {isError && <p className={css.error}>Server error. Sorry!</p>}
//       {data && !isLoading && <NoteList notes={data.notes} />}
//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           totalPages={totalPages}
//         />
//       )}

//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm onCloseModal={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './NotesPage.module.css';
import { fetchNotes } from '../../lib/api';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import Pagination from '../../components/Pagination/Pagination';
import { useDebouncedCallback } from 'use-debounce';

type NotesClientProps = {
  initialPage: number;
  initialQuery: string;
};

export default function NotesClient({
  initialPage,
  initialQuery,
}: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [debouncedValue, setDebouncedValue] = useState(initialQuery);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedValue(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, debouncedValue],
    queryFn: () => fetchNotes(currentPage, debouncedValue),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p className={css.loading}>loading notes...</p>}
      {isError && <p className={css.error}>Server error. Sorry!</p>}
      {data && !isLoading && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCloseModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
