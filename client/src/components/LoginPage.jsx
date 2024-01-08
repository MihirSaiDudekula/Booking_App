export default function LoginPage() {
  return (
    <div className="mt-4 grow items-center justify-around">
    <div>
    	<header className="text-4xl text-center mb-4">Login</header>
    	<form className="max-w-2xl mx-auto" action="">
    	  <input type="email" placeholder="mailid@email.com" />
    	  <input type="password" placeholder="password" />
    	  <button className="primary">Login</button>
    	</form>
    </div>
    </div>
  );
}
