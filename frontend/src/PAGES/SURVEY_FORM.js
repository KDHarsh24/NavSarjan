function SURVEY_FORM(){
    return(
        <div class="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
    <h2 class="text-2xl text-black font-medium mb-4">Survey</h2>
    <form >
        <div class="mb-4">
            <label for="name" class="block text-gray-700 font-medium mb-2">Name</label>
            <input type="text" id="name" name="name" class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" required/>
        </div>

        <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" id="email" name="email" class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" required/>
        </div>

        <div class="mb-4">
            <label for="organization" class="block text-gray-700 font-medium mb-2">Organization/Institution</label>
            <input type="text" id="organization" name="organization" class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"/>
        </div>

        <div class="mb-4">
            <label for="role" class="block text-gray-700 font-medium mb-2">Role/Designation</label>
            <select id="role" name="role" class="border text-black border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400">
                <option value="" className="text-black">Select role</option>
                <option value="researcher" className="text-black">Researcher</option>
                <option value="entrepreneur" className="text-black">Entrepreneur</option>
                <option value="investor" className="text-black">Investor</option>
                <option value="policymaker" className="text-black">Policymaker</option>
                <option value="other" className="text-black">Other</option>
            </select>
        </div>

        <div class="mb-4">
            <label for="challenges" class="block text-gray-700 font-medium mb-2">What are the main challenges encountered by you in managing research, start-ups, or IPR?</label>
            <textarea id="challenges" name="challenges" class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" rows="5"></textarea>
        </div>


    
        <div class="mb-4">
            <label for="suggestions" class="block text-gray-700 font-medium mb-2">Suggestions for improving the innovation ecosystem</label>
            <textarea id="suggestions" name="suggestions" class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" rows="5"></textarea>
        </div>

        <div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Submit</button>
        </div>
    </form>
</div>

    )
};

export default SURVEY_FORM;