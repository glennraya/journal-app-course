import { useEffect, useState } from 'react'
import { ImHappy2 } from 'react-icons/im'
import { ImNeutral2 } from 'react-icons/im'
import { ImSad2 } from 'react-icons/im'

const JournalList = () => {
    useEffect(() => {
        const hasJournals = localStorage.getItem('journals')
        const journalEntries = hasJournals ? JSON.parse(hasJournals) : []

        setJournals(journalEntries)
        console.log(journalEntries)
    }, [])

    const [journals, setJournals] = useState([
        {
            id: '',
            title: '',
            emotion: '',
            body: '',
            createdAt: ''
        }
    ])

    const initJournalState = {
        id: '',
        title: '',
        emotion: '',
        body: '',
        createdAt: ''
    }

    const [journal, setJournal] = useState(initJournalState)

    const onViewJournal = (journal: {
        id: string
        title: string
        emotion: string
        body: string
        createdAt: string
    }) => {
        setJournal(journal)
        console.log(journal)
    }

    const closeJournal = () => {
        setJournal(initJournalState)
    }

    const deleteJournal = (id: string) => {
        const updatedJournals = journals.filter(journal => journal.id !== id)

        setJournals(updatedJournals)

        const updatedJournalStr = JSON.stringify(updatedJournals)

        localStorage.setItem('journals', updatedJournalStr)

        closeJournal()
    }

    return (
        <>
            {journals.length >= 1 && journal.id === '' && (
                <div className="grid grid-cols-2 gap-4">
                    {journals.map(journal => (
                        <div
                            className="rounded-lg bg-white p-4 transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:shadow-xl"
                            key={journal.id}
                            onClick={() => onViewJournal(journal)}
                        >
                            <h3 className="font-playfair mb-2 text-xl font-bold">
                                {journal.title}
                            </h3>

                            <h4>Created at {journal.createdAt}</h4>
                        </div>
                    ))}
                </div>
            )}

            {journals.length === 0 && (
                <div className="w-full rounded-xl bg-white p-3 text-center font-medium">
                    There are no published journals yet.
                </div>
            )}

            {journal.id != '' && (
                <div className="relative flex max-h-[640px] flex-col overflow-y-scroll rounded-xl bg-white p-8">
                    {journal.emotion == 'Sad' ? (
                        <ImSad2
                            size={128}
                            className="absolute -right-8 -top-3 z-0 text-gray-200"
                        />
                    ) : journal.emotion === 'Happy' ? (
                        <ImHappy2
                            size={128}
                            className="absolute -right-8 -top-3 z-0 text-gray-200"
                        />
                    ) : (
                        <ImNeutral2
                            size={128}
                            className="absolute -right-8 -top-3 z-0 text-gray-200"
                        />
                    )}
                    <h2 className="font-playfair z-10 mb-2 text-4xl font-bold">
                        {journal.title}
                    </h2>
                    <h3 className="mb-4 text-gray-500">
                        Created at {journal.createdAt}
                    </h3>
                    <p>{journal.body}</p>
                    <div className="flex justify-between gap-2">
                        <button
                            className="btn mt-2 flex-1"
                            onClick={() => deleteJournal(journal.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-secondary mt-2 flex-1"
                            onClick={closeJournal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default JournalList
