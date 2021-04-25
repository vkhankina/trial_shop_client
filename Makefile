include production.env
export

docker-build:
	docker build --build-arg REACT_APP_TRIAL_SHOP_API_URL=${REACT_APP_TRIAL_SHOP_API_URL} \
 		--tag eu.gcr.io/trial-shop/client:latest .

docker-run:
	docker run --publish 3000:5000 --name trial-shop-client -d eu.gcr.io/trial-shop/client:latest

docker-push:
	docker push eu.gcr.io/trial-shop/client

docker-clean:
	docker stop trial-shop-client
	docker rm trial-shop-client
	docker rmi eu.gcr.io/trial-shop/client:latest