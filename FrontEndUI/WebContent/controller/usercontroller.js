/**
 * 
 */
app.controller('UserController',function(UserService,$scope,$location,$rootScope,$cookieStore)
        {
    
    $scope.register=function()
   {
    	console.log("register....")
    	UserService.registerUser($scope.user).then (function(response)
        {
            $scope.message="Registered successfully..... Please Login...."
                console.log("done")
                
                $location.path('/login')
        }, function(response)
        {
            $scope.error=response.data;
            $location.path('/registration')
        })
    
    }
    
    $scope.login=function(){
    	UserService.login($scope.user).then(function(response){
            $rootScope.currentUser=response.data
            $cookieStore.put("currentUser",response.data)
            $location.path('/home')
            
        },function(response){
            $scope.error=response.data
            $location.path('/login')
        })
    }
    $scope.userobj=UserService.getUserByUsername().then(function(response)
    		{
    	$scope.userobj=response.data
    },function(response){
    	console.log(response.status)
    })
    $scope.update=function()
    {
    	UserService.updateUserProfile($scope.userobj).then(function(response)
    			
    			{
    		$scope.message="Updated the profile successfully"
    	},function(response){
    		console.log(response.data)
    	})
    }
})