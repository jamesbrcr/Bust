export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">About Bust</h1>

      <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          Bust was built to solve a simple problem: keeping track of recipes you've actually made.
          Not recipes you've saved and forgotten — the ones you've cooked, tweaked, and made your own.
        </p>

        <p>
          Most recipe apps are built around discovery. Bust is built around memory. It's a place to
          record what you've already done in the kitchen, how it turned out, and what you'd do
          differently next time.
        </p>

        <p>
          Add a photo, rate it out of ten, jot down the ingredients, and leave yourself a note.
          That's it. No meal planning, no grocery lists, no social features — just your personal
          record of food you've made and loved.
        </p>
      </div>
    </div>
  )
}
