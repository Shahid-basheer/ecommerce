import Link from 'next/link';
export default function BreadCrumps({breadCrumps}){
    
return <div>
  <section className="py-5 sm:py-7 bg-blue-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
          {breadCrumps?.map((breadCrumb, index) => (
            <li key={index} className="inline-flex items-center">
              <Link
                href={breadCrumb.url}
                className="text-gray-600 hover:text-blue-600"
              >
                {breadCrumb.name}
              </Link>
              {breadCrumps?.length - 1 !== index && (
                <i className="ml-3 text-gray-400 fa fa-chevron-right"></i>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
</div>
}