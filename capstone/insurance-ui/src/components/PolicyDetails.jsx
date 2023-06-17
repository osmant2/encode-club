import React from 'react'
import { car2 } from '../assets'

const PolicyDetails = () => {
    return (
        <div className='my-32 border rounded-xl mx-20 py-5 shadow'>
            <div>
                <h1 className='transform uppercase text-2xl text-center my-5'>auto liability coverage</h1>
            </div>

            <div className='mx-40'>            
                <p className='text-justify text-lg leading-10 text-gray-600'>
                    Auto liability insurance coverage helps cover the costs of the other driver’s property and bodily injuries if you’re found at fault in an accident.
    
    The auto liability coverage definition may sound simple enough, but here’s a real life example: you’re at a four-way stop a few blocks from your house. You’ve done this route hundreds of times, so you don’t notice that it’s technically the other car’s turn to go – until it’s too late. The next thing you know; you’ve smashed into another driver’s car in the middle of the intersection. Your insurance company will work with the other driver’s insurance company to determine who is at fault (if you live in a no-fault state). If you have liability insurance, your insurance provider will cover costs for the driver’s damaged car, minus your deductible, and up to your covered limit.
    
    What does auto liability insurance cover?
    Liability insurance actually consists of two types of auto coverage:
    
    Bodily injury liability protection applies to the medical expenses of the other party if you are found at fault in the accident. In some circumstances, it may even cover lost wages and/or legal fees if the injured party files a lawsuit.
    Property damage liability protection applies to damages to property resulting from a covered accident in which you’re at fault. It may cover the other party’s vehicle repair or replacement costs, as well as other property that may have been damaged in the accident, such as fences, structures, phone poles and other types of property.
    Minimum liability limits for each of these coverage types vary depending on which state you live in. Liability coverage cannot be used to pay for your vehicular damage or personal injury costs. For that, you will need comprehensive and/or collision coverage.
    
    Do I need auto liability insurance?
    Yes. A certain amount of liability insurance is required in all states – this is often referred to as “minimum coverage.” Although, the coverage types and amounts vary from state to state; all states require property damage liability (PD) and bodily injury (BI) protection. Some states also require personal injury protection insurance , uninsured or underinsured motorist protection and/or property protection. You can opt for a larger amount than the minimum required by your state, depending on your needs.
    
    Think of liability insurance as the baseline for auto coverage. Collision coverage and comprehensive coverage – not to mention other optional coverages like medical payments coverage and personal injury protection – can’t be purchased until you have adequate liability insurance.
    
    If you don’t have liability insurance, it’s important that you get it as soon as possible to meet your state’s minimum insurance requirement. Start your auto liability insurance quote online with Nationwide.
                </p>
            </div>
    
            <div className='flex justify-center mx-10 '>
                <div><img src={car2} alt="" className='mx-auto rounded-xl'/></div>
            </div>
        </div>
      )
}

export default PolicyDetails