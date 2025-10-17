package com.mbccurrency.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "news_sentiment") // ✅ 실제 MongoDB 컬렉션 이름
public class NewsSentiment {

    @Id
    private String id;

    private Date date;             // ISODate 매핑 (LocalDate ❌)

    private Double value;          // 지수값

    @Field("stat_code")
    private String statCode;

    @Field("item_code")
    private String itemCode;

    @Field("item_name")
    private String itemName;

    @Field("unit_name")
    private String unitName;

    @Field("created_at")
    private Date createdAt;

	public NewsSentiment() {
		super();
	}

	public NewsSentiment(String id, Date date, Double value, String statCode, String itemCode, String itemName,
			String unitName, Date createdAt) {
		super();
		this.id = id;
		this.date = date;
		this.value = value;
		this.statCode = statCode;
		this.itemCode = itemCode;
		this.itemName = itemName;
		this.unitName = unitName;
		this.createdAt = createdAt;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	public String getStatCode() {
		return statCode;
	}

	public void setStatCode(String statCode) {
		this.statCode = statCode;
	}

	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "NewsSentiment [id=" + id + ", date=" + date + ", value=" + value + ", statCode=" + statCode
				+ ", itemCode=" + itemCode + ", itemName=" + itemName + ", unitName=" + unitName + ", createdAt="
				+ createdAt + "]";
	}
    
    
    
}
