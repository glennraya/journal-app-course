import { useState } from 'react'
import AddJournalForm from './components/AddJournalForm'
import Tabs from './components/Tabs'
import JournalList from './components/JournalList'

const App = () => {
    const [currentTab, setCurrentTab] = useState('add')

    const handleTab = (selectedTab: string) => {
        setCurrentTab(selectedTab)
    }

    return (
        <>
            <div className="mx-auto flex w-[640px] flex-col py-4">
                <div className="flex flex-col gap-2 rounded-xl bg-white p-4">
                    {/* Headers */}
                    <header>
                        <h1 className="mb-4 border-b border-gray-300 pb-3 text-2xl font-bold">
                            Journal App
                        </h1>
                        <p>
                            Embrace each day with reflection: Capture your
                            moments, chart your growth, and craft your journey,
                            one story at a time.
                        </p>
                    </header>
                    {/* Tabs */}
                    <Tabs onSelectTab={handleTab} />

                    {/* Form */}
                    <div className="flex flex-col gap-3 rounded-xl bg-gray-200 p-4">
                        {currentTab === 'add' ? (
                            <AddJournalForm />
                        ) : (
                            <JournalList />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
